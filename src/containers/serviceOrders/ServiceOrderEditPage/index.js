import { Button } from 'reactstrap';
import { object, func } from 'prop-types';
import { Link } from 'react-router';

import {
  ServiceOrderForm,
  Page,
  PageContent,
  PageHeader,
} from 'src/components';
import { breadcrumbsType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  validationErrors: object,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const ServiceOrderEditPage = ({
  breadcrumbs,
  choices,
  clients,
  users,
  industries,
  focalProfiles,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page>
    <PageHeader breadcrumbs={breadcrumbs}>
      <Button tag={Link} to="/service-orders" color="success">Done</Button>
    </PageHeader>
    <PageContent>
      <ServiceOrderForm {...{
          validationErrors,
          breadcrumbs,
          clients,
          users,
          industries,
          focalProfiles,
          choices,

          onFieldChange
        }}
      />
      <Button color="danger" onClick={onDelete}>Delete</Button>
    </PageContent>
  </Page>
);

ServiceOrderEditPage.propTypes = propTypes;

export default enhance(ServiceOrderEditPage);
