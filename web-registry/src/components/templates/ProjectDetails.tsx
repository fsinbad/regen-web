import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/material';
import * as togeojson from '@mapbox/togeojson';
import { useLocation, useParams } from 'react-router-dom';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { getFormattedDate } from 'web-components/lib/utils/format';
import IssuanceModal, {
  IssuanceModalData,
} from 'web-components/lib/components/modal/IssuanceModal';
import Timeline from 'web-components/lib/components/timeline';
import ProjectMedia, {
  Asset,
} from 'web-components/lib/components/sliders/ProjectMedia';
import BuyFooter from 'web-components/lib/components/fixed-footer/BuyFooter';
import Modal from 'web-components/lib/components/modal';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import Banner from 'web-components/lib/components/banner';
import SEO from 'web-components/lib/components/seo';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import StaticMap from 'web-components/lib/components/map/StaticMap';
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import Section from 'web-components/lib/components/section';

import { setPageView } from '../../lib/ga';
import getApiUri from '../../lib/apiUri';
import { buildIssuanceModalData } from '../../lib/transform';
import { useLedger } from '../../ledger';
import { chainId } from '../../lib/ledger';
import { useWallet } from '../../lib/wallet';
import {
  Documentation,
  ProjectTopSection,
  ProjectImpactSection,
  MoreProjectsSection,
  CreditsPurchaseForm,
  LandManagementActions,
  BuyCreditsModal,
  ConfirmationModal,
} from '../organisms';
import { Credits } from '../organisms/BuyCreditsModal';
import {
  useMoreProjectsQuery,
  useProjectByHandleQuery,
} from '../../generated/graphql';
import {
  useEcologicalImpactByIriQuery,
  EcologicalImpact,
} from '../../generated/sanity-graphql';
import { client } from '../../sanity';
import { getBatchesWithSupply, getBatchesTotal } from '../../lib/ecocredit';
import { getMetadata } from '../../lib/metadata-graph';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../types/ledger/ecocredit';
import {
  ProjectMetadataLD,
  ProjectStakeholder,
} from '../../generated/json-ld/index';

interface Project {
  creditPrice?: CreditPrice;
  stripePrice?: string;
  credits?: Credits;
}

// Update for testing purchase credits modal
const project: Project = {};

function getVisiblePartyName(party?: ProjectStakeholder): string | undefined {
  return party?.['regen:showOnProjectPage']
    ? party?.['schema:name']
    : undefined;
}

function ProjectDetails(): JSX.Element {
  const { api } = useLedger({ forceExp: true });
  const { projectId } = useParams();
  const theme = useTheme<Theme>();
  const walletContext = useWallet();
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [batchData, setBatchData] = useState<BatchInfoWithSupply[]>([]);
  const [batchTotals, setBatchTotals] = useState<BatchTotalsForProject>();
  const [geojson, setGeojson] = useState<any | null>(null);
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.queryClient);
  }

  // fetch project
  const { data } = useProjectByHandleQuery({
    skip: !projectId,
    variables: { handle: projectId as string },
  });
  const metadata: ProjectMetadataLD = data?.projectByHandle?.metadata;

  const vcsProjectId = metadata?.['regen:vcsProjectId'];
  // const vintageBatchDenoms: string[] = (
  //   data?.projectByHandle?.creditVintagesByProjectId?.nodes || []
  // )
  //   .map(v => v?.batchDenom || '')
  //   .filter(Boolean);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        const { data: batches } = await getBatchesWithSupply();
        const filteredBatches = batches.filter(async batch => {
          let batchMetadata;
          if (batch.metadata.length) {
            batchMetadata = await getMetadata(batch.metadata);
          }
          return batchMetadata?.['regen:vcsProjectId'] === vcsProjectId;
        });
        const { totals } = await getBatchesTotal(filteredBatches);
        setBatchData(filteredBatches);
        setBatchTotals(totals);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }
    };
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: projectsData } = useMoreProjectsQuery();

  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setPageView(location);
    setGeojson(null); // reset when location changes
  }, [location]);

  const otherProjects = projectsData?.allProjects?.nodes?.filter(
    p => p?.handle !== projectId,
  );

  // Convert kml to geojson
  const mapFile: string = metadata?.['regen:boundaries']?.['@value'];
  const isGISFile: boolean = /\.(json|kml)$/i.test(mapFile);
  const isKMLFile: boolean = /\.kml$/i.test(mapFile);
  const metadataLocation = metadata?.['schema:location'];

  useEffect(() => {
    if (!geojson && isGISFile) {
      fetch(mapFile)
        .then(r => r.text())
        .then(text => {
          let geojson;
          if (isKMLFile) {
            const dom = new DOMParser().parseFromString(text, 'text/xml');
            geojson = togeojson.kml(dom);
          } else {
            geojson = JSON.parse(text);
          }
          setGeojson(geojson);
        });
    } else if (metadataLocation) {
      setGeojson(metadataLocation);
    }
  }, [geojson, isGISFile, isKMLFile, mapFile, metadataLocation]);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const [issuanceModalData, setIssuanceModalData] =
    useState<IssuanceModalData | null>(null);
  const [issuanceModalOpen, setIssuanceModalOpen] = useState(false);
  const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);

  const viewOnLedger = (creditVintage: any): void => {
    if (creditVintage?.txHash) {
      if (creditVintage.txHash !== issuanceModalData?.txHash) {
        const issuanceData = buildIssuanceModalData(data, creditVintage);
        setIssuanceModalData(issuanceData);
      }
      setIssuanceModalOpen(true);
    }
  };

  const handleProcessingModalClose = (): void => {
    if (walletContext?.txResult?.transactionHash) {
      setIsConfirmationModalOpen(true);
    }
    setIsProcessingModalOpen(false);
  };

  const handleConfirmationModalClose = (): void => {
    setIsProcessingModalOpen(false);
    setIsConfirmationModalOpen(false);
    walletContext.setTxResult(undefined);
  };

  const handleTxQueued = (txBytes: Uint8Array): void => {
    setIsProcessingModalOpen(true);
    if (walletContext?.broadcast) {
      walletContext.broadcast(txBytes);
    }
  };

  const creditClassVersion =
    data?.projectByHandle?.creditClassByCreditClassId?.creditClassVersionsById
      ?.nodes?.[0];
  const creditClassName = creditClassVersion?.name;
  const partyName =
    getVisiblePartyName(metadata?.['regen:landSteward']) ||
    getVisiblePartyName(metadata?.['regen:projectDeveloper']) ||
    getVisiblePartyName(metadata?.['regen:landOwner']) ||
    getVisiblePartyName(metadata?.['regen:projectOriginator']);
  const projectAddress = metadataLocation?.['place_name'];
  const galleryPhotos = metadata?.['regen:galleryPhotos']?.['@list'];
  const noGallery = !galleryPhotos || galleryPhotos?.length === 0;
  const previewPhoto = metadata?.['regen:previewPhoto']?.['@value'];
  const noGalleryAssets: Asset[] = [];
  if (previewPhoto) {
    noGalleryAssets.push({ src: previewPhoto, type: 'image' });
  }
  if (geojson) {
    noGalleryAssets.push(
      <StaticMap
        geojson={geojson}
        mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />,
    );
  }
  const assets = noGallery
    ? noGalleryAssets
    : galleryPhotos.map((photo: { '@value': string }) => ({
        src: photo['@value'],
        type: 'image',
      }));

  const siteMetadata = {
    title: `Regen Network Registry`,
    description:
      creditClassName && partyName && projectAddress
        ? `Learn about ${creditClassName} credits sourced from ${partyName} in ${projectAddress}.`
        : '',
    author: `Regen Network`,
    siteUrl: `${window.location.origin}`,
  };

  const coBenefitsIris =
    creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
      '@list'
    ]?.map((impact: { '@id': string }) => impact['@id']) || [];
  const primaryImpactIRI = [
    creditClassVersion?.metadata?.['http://regen.network/indicator']?.['@id'],
  ];
  const { data: primaryImpactData } = useEcologicalImpactByIriQuery({
    client,
    variables: {
      iris: primaryImpactIRI,
    },
    skip: !primaryImpactIRI,
  });
  const { data: coBenefitData } = useEcologicalImpactByIriQuery({
    client,
    variables: {
      iris: coBenefitsIris,
    },
    skip: !coBenefitsIris,
  });

  let impactData: EcologicalImpact[] = [];
  if (primaryImpactData && primaryImpactData.allEcologicalImpact?.length) {
    impactData = [...primaryImpactData?.allEcologicalImpact];
  }

  if (coBenefitData && coBenefitData.allEcologicalImpact?.length) {
    impactData = [...impactData, ...coBenefitData?.allEcologicalImpact];
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={location}
        siteMetadata={siteMetadata}
        title={metadata?.['schema:name']}
        imageUrl={metadata?.['schema:image']?.['@value']}
      />

      {assets.length > 0 && (
        <ProjectMedia
          assets={assets}
          gridView
          mobileHeight={theme.spacing(78.75)}
          imageStorageBaseUrl={imageStorageBaseUrl}
          apiServerUrl={apiServerUrl}
          imageCredits={metadata?.['schema:creditText']}
        />
      )}
      <ProjectTopSection
        data={data}
        batchData={{
          batches: batchData,
          totals: batchTotals,
        }}
        geojson={geojson}
        isGISFile={isGISFile}
      />
      {impactData.length > 0 && (
        <div className="topo-background-alternate">
          <ProjectImpactSection impact={impactData} />
        </div>
      )}

      {data?.projectByHandle?.documentsByProjectId?.nodes &&
        data.projectByHandle.documentsByProjectId.nodes.length > 0 && (
          <div className="topo-background-alternate">
            <Documentation
              txClient={txClient}
              onViewOnLedger={viewOnLedger}
              documents={data?.projectByHandle?.documentsByProjectId?.nodes.map(
                doc => ({
                  name: doc?.name || '',
                  type: doc?.type || '',
                  date: doc?.date || '',
                  url: doc?.url || '',
                  ledger: '',
                  eventByEventId: doc?.eventByEventId,
                }),
              )}
            />
          </div>
        )}

      {metadata?.['regen:landManagementActions']?.['@list'] && (
        <div className="topo-background-alternate">
          <LandManagementActions
            actions={metadata?.['regen:landManagementActions']?.['@list']?.map(
              (action: any) => ({
                name: action['schema:name'],
                description: action['schema:description'],
                imgSrc: action['schema:image']?.['@value'],
              }),
            )}
            title="Land Management Actions"
            subtitle="This is how the project developers are planning to achieve the primary impact."
          />
        </div>
      )}

      {data?.projectByHandle?.eventsByProjectId?.nodes &&
        data.projectByHandle.eventsByProjectId.nodes.length > 0 && (
          <Box
            className="topo-background-alternate"
            sx={{ pb: { xs: 17, sm: 22.25 } }}
          >
            <Section titleVariant="h2" title="Timeline" titleAlign="left">
              <Box sx={{ mt: { xs: 10, sm: 12 } }}>
                <Timeline
                  txClient={txClient}
                  onViewOnLedger={viewOnLedger}
                  events={data.projectByHandle.eventsByProjectId.nodes.map(
                    node => ({
                      date: getFormattedDate(node?.date, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }),
                      summary: node?.summary || '',
                      description: node?.description || '',
                      creditVintage: node?.creditVintageByEventId,
                    }),
                  )}
                />
              </Box>
            </Section>
          </Box>
        )}

      {otherProjects && otherProjects.length > 0 && (
        <div className="topo-background-alternate">
          <MoreProjectsSection projects={otherProjects} />
        </div>
      )}

      {chainId && project.creditPrice ? (
        <BuyFooter
          onClick={() => setIsBuyCreditsModalOpen(true)}
          creditPrice={project.creditPrice}
        />
      ) : (
        <FixedFooter justifyContent="flex-end">
          <>
            <ContainedButton
              size="large"
              onClick={handleOpen}
              startIcon={<EmailIcon />}
            >
              send me more info
            </ContainedButton>
            {/*
            <OutlinedButton className={styles.callButton} startIcon={<PhoneIcon />}>
              schedule a call
            </OutlinedButton>
          */}
          </>
        </FixedFooter>
      )}

      {project.creditPrice && project.stripePrice && (
        <Modal open={open} onClose={handleClose}>
          <CreditsPurchaseForm
            onClose={handleClose}
            creditPrice={project.creditPrice}
            stripePrice={project.stripePrice}
          />
        </Modal>
      )}
      <Modal open={open} onClose={handleClose}>
        <MoreInfoForm
          apiUrl={getApiUri()}
          onClose={handleClose}
          onSubmit={() => {
            handleClose();
            setSubmitted(true);
          }}
        />
      </Modal>
      {issuanceModalData && (
        <IssuanceModal
          txClient={txClient}
          open={issuanceModalOpen}
          onClose={() => setIssuanceModalOpen(false)}
          {...issuanceModalData}
        />
      )}
      {data && creditClassVersion && chainId && project.creditPrice && (
        <>
          <BuyCreditsModal
            open={isBuyCreditsModalOpen}
            onClose={() => setIsBuyCreditsModalOpen(false)}
            onTxQueued={txRaw => handleTxQueued(txRaw)}
            project={{
              id: projectId as string,
              name: data.projectByHandle?.metadata?.['schema:name'],
              image: data.projectByHandle?.metadata?.['regen:previewPhoto'],
              creditDenom:
                creditClassVersion.metadata?.[
                  'http://regen.network/creditDenom'
                ] || creditClassName,
              credits: project.credits,
            }}
            imageStorageBaseUrl={imageStorageBaseUrl}
            apiServerUrl={apiServerUrl}
          />
          <ProcessingModal
            open={
              !walletContext?.txResult?.transactionHash && isProcessingModalOpen
            }
            onClose={handleProcessingModalClose}
          />
          <ConfirmationModal
            open={
              !!isConfirmationModalOpen ||
              !!walletContext?.txResult?.transactionHash
            }
            onClose={handleConfirmationModalClose}
            data={walletContext.txResult}
          />
        </>
      )}
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </Box>
  );
}

export { ProjectDetails };
