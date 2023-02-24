import { Link } from '@mui/material';
import Grid, { GridDirection } from '@mui/material/Grid';

import { BlockContent } from '../block-content';
import OrganizationIcon from '../icons/OrganizationIcon';
import { Body, Subtitle, Title } from '../typography';
import { getMobileSize, getSizeVariant, TextSize } from '../typography/sizing';
import UserAvatar from './UserAvatar';
import { UserInfoTypes } from './UserInfo.types';

export interface User {
  name: string;
  nameRaw?: string | JSX.Element;
  type: UserInfoTypes;
  location?: string;
  image?: string | null;
  description?: string | null;
  link?: string | null;
}

interface UserInfoProps {
  user: User;
  size?: TextSize;
  direction?: GridDirection;
  titleComponent?: 'title' | 'subtitle';
  border?: boolean;
  icon?: any;
}
export default function UserInfo({
  user,
  size = 'lg',
  direction,
  border = true,
  titleComponent = 'title',
  icon,
}: UserInfoProps): JSX.Element {
  const sizeVariant = getSizeVariant(size);
  const mobileSizeVariant = getSizeVariant(getMobileSize(size));
  const TitleComponent = titleComponent === 'title' ? Title : Subtitle;
  const { name: userName, nameRaw } = user;
  const name = nameRaw ? (
    <BlockContent content={nameRaw} />
  ) : (
    <TitleComponent
      sx={({ typography }) => {
        return {
          fontSize: [
            typography[mobileSizeVariant].fontSize,
            typography[sizeVariant].fontSize,
          ],
        };
      }}
    >
      {userName}
    </TitleComponent>
  );

  return (
    <Grid container direction={direction} wrap="nowrap">
      <Grid item>
        <UserAvatar
          alt={userName}
          src={user.image}
          href={user.link}
          size={size}
          border={border}
          icon={
            !user.image && user.type === 'ORGANIZATION' ? (
              <OrganizationIcon />
            ) : (
              icon
            )
          }
        />
      </Grid>
      <Grid
        item
        sx={{
          ml: size === 'xs' ? 3.5 : 4.8,
          textAlign: direction === 'column' ? 'center' : 'left',
          alignSelf: 'center',
        }}
      >
        {user.link ? (
          <Link
            sx={{ color: 'primary.contrastText' }}
            href={user.link}
            target="_blank"
          >
            {name}
          </Link>
        ) : (
          name
        )}
        {user.location && (
          <Body size="sm" pt={1.6}>
            {user.location}
          </Body>
        )}
        {user.description && (
          <Body size="md" pt={2.8}>
            {user.description}
          </Body>
        )}
      </Grid>
    </Grid>
  );
}
