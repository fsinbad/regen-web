import React from 'react';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-mui';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import DatePickField from 'web-components/lib/components/inputs/DatePickField';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import { Subtitle } from 'web-components/lib/components/typography';

interface AdditionalityFormProps {
  submit: (values: AdditionalityValues) => Promise<void>;
}

export interface AdditionalityValues {
  rotationalGrazing: string;
  rotationalGrazingStartDate: string | null;
  highDensityGrazing: string;
  highDensityGrazingStartDate: string | null;
  residueGrazing: string;
  residueGrazingStartDate: string | null;
  otherGrazing: string;
  traditionalGrazing: string;
  cropland: string;
  naturalEcosystem: string;
  environmentalConditions: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(3, 0, 3),
    '&:first-of-type': {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(9),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(6.5),
      },
    },
  },
}));

export const AdditionalityForm: React.FC<AdditionalityFormProps> = props => {
  const classes = useStyles();

  const DateLabel: React.FC = () => (
    <Subtitle size="sm" mb={1}>
      Choose a practice start date
    </Subtitle>
  );

  return (
    <Formik
      initialValues={{
        rotationalGrazing: '',
        rotationalGrazingStartDate: null,
        highDensityGrazing: '',
        highDensityGrazingStartDate: null,
        residueGrazing: '',
        residueGrazingStartDate: null,
        otherGrazing: '',
        traditionalGrazing: '',
        cropland: '',
        naturalEcosystem: '',
        environmentalConditions: '',
      }}
      validate={(values: AdditionalityValues) => {
        const errors: Partial<AdditionalityValues> = {};
        const errorFields: Array<keyof AdditionalityValues> = [];
        errorFields.forEach(value => {
          if (!values[value]) {
            errors[value] = requiredMessage;
          }
        });
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await props.submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange }) => {
        return (
          <Form>
            <OnBoardingCard className={classes.card}>
              <ControlledFormLabel>
                Which regenerative practices have you been applying and for how
                long?
              </ControlledFormLabel>
              <Field component={RadioGroup} name="includesGrasslands">
                <Field
                  label="Rotational grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="rotationalGrazing"
                  checked={!!values.rotationalGrazing}
                  tooltip="A managed grazing system where livestock are moved frequently among pasture divisions or paddocks based on forage quality and livestock nutrition needs. Portable fencing allows each paddock to rest and regrow until the next grazing rotation."
                  activeContent={
                    <Box pb={2}>
                      <DateLabel />
                      <Field
                        component={DatePickField}
                        pickerViews={['year', 'month']}
                        name="rotationalGrazingStartDate"
                        value={values.rotationalGrazingStartDate}
                        type="input"
                      />
                    </Box>
                  }
                />
                <Field
                  label="High density grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="highDensityGrazing"
                  checked={!!values.highDensityGrazing}
                  tooltip="In this form of rotational grazing, grazing animals, at a very high stocking density, graze a management unit for very short period of time."
                  activeContent={
                    <Box pb={2}>
                      <DateLabel />
                      <Field
                        component={DatePickField}
                        pickerViews={['year', 'month']}
                        name="highDensityGrazingStartDate"
                        value={values.highDensityGrazingStartDate}
                        type="input"
                      />
                    </Box>
                  }
                />
                <Field
                  label="Residue grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="residueGrazing"
                  checked={!!values.residueGrazing}
                  tooltip="The practice of letting livestock graze crop residue after a crop has been harvested."
                  activeContent={
                    <Box pb={2}>
                      <DateLabel />
                      <Field
                        component={DatePickField}
                        pickerViews={['year', 'month']}
                        name="residueGrazingStartDate"
                        value={values.residueGrazingStartDate}
                        type="input"
                      />
                    </Box>
                  }
                />
                <Field
                  label="Other regenerative grazing practice"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="otherGrazing"
                  checked={!!values.otherGrazing}
                />
              </Field>
            </OnBoardingCard>

            <OnBoardingCard className={classes.card}>
              <ControlledFormLabel>
                Prior to adopting these regenerative practices (going back 5
                years prior) how were you using the land?
              </ControlledFormLabel>
              <Field component={RadioGroup} name="includesGrasslands">
                <Field
                  label="Cropland"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="cropland"
                  checked={!!values.cropland}
                />
                <Field
                  label="Traditional grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="traditionalGrazing"
                  checked={!!values.traditionalGrazing}
                />
                <Field
                  label="Natural ecosystem, unmanaged"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="naturalEcosystem"
                  checked={!!values.naturalEcosystem}
                />
              </Field>
            </OnBoardingCard>

            <OnBoardingCard className={classes.card}>
              <ControlledFormLabel>
                Prior environmental conditions
              </ControlledFormLabel>
              <Field
                component={ControlledTextField}
                description="Relevant environmental changes within the project area. These include changes in vegetation such as clearing or planting, hydrology, soil conditions, or other."
                name="environmentalConditions"
                rows={6}
                minRows={6}
                multiline
                optional
                defaultStyle={false}
              />
            </OnBoardingCard>
          </Form>
        );
      }}
    </Formik>
  );
};
