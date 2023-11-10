import { useCallback, useMemo } from 'react';
import { useUser } from '../../hooks/useUser';
import classes from './DictionariesContainer.module.scss';
import { useApi } from '../../hooks/useApi';
import { useSignForm } from '../../hooks/useSignForm';
import { HttpMethod } from '../../enums/HttpMethods';
import { Link } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const DictionariesContainer = () => {
  const { user } = useUser();
  const { fetch } = useApi();

  return (
    <div className={classes.dicitonariesContainer}>
      <Tabs>
        <TabList>
          <Tab>Company</Tab>
          <Tab>Contract</Tab>
        </TabList>

        <TabPanel>
          <h2>Company</h2>
        </TabPanel>
        <TabPanel>
          <h2>Contract</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};
