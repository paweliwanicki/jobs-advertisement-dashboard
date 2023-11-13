import { useCallback, useMemo } from "react";
import { useUser } from "../../hooks/useUser";
import classes from "./DictionariesContainer.module.scss";
import { useApi } from "../../hooks/useApi";
import { useSignForm } from "../../hooks/useSignForm";
import { HttpMethod } from "../../enums/HttpMethods";
import { Link } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDictionaries } from "../../hooks/useDictionaries";
import { Company } from "../../types/Company";

export const DictionariesContainer = () => {
  const { user } = useUser();
  const { fetch } = useApi();

  const { companies, contracts } = useDictionaries();

  return (
    <div className={classes.dicitonariesContainer}>
      <Tabs>
        <TabList>
          <Tab>Company</Tab>
          <Tab>Contract</Tab>
        </TabList>

        <TabPanel>
          <h2>Company</h2>

          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </thead>
            <tbody>
              {companies.map(({ id, name }: Company) => (
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <h2>Contract</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};
