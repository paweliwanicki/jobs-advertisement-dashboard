import { useCallback, useMemo, useState, ReactNode } from 'react';
import classes from './DictionariesContainer.module.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useDictionaries } from '../../hooks/useDictionaries';
import Table from '../../components/common/Table/Table';
import Modal from '../../components/common/Modal/Modal';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { Company } from '../../types/Company';
import { Contract } from '../../types/Contract';

type DictionaryFields = 'NAME';
type DictionaryActions = 'edit' | 'delete';
type DictionaryTable = 'company' | 'contract';
type DictionaryType = Company | Contract;

const DICTIONARY_FIELDS: Record<DictionaryFields, string> = {
  NAME: 'name',
} as const;

export const DictionariesContainer = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  const [editModalValue, setEditModalValue] = useState<string>();

  const [selectedItem, setSelectedItem] = useState<DictionaryType>();
  const [selectedTable, setSelectedTable] = useState<DictionaryTable>();

  const {
    companies,
    contracts,
    addUpdateCompany,
    addUpdateContract,
    deleteCompany,
    deleteContract,
  } = useDictionaries();

  const handleDictionaryElementUpdate: Record<
    DictionaryTable,
    (element: DictionaryType) => void
  > = useMemo(() => {
    return {
      company: addUpdateCompany,
      contract: addUpdateContract,
    };
  }, [selectedItem]);

  const handleDictionaryElementDelete: Record<
    DictionaryTable,
    (id: number) => void
  > = useMemo(() => {
    return {
      company: deleteCompany,
      contract: deleteContract,
    };
  }, [selectedItem]);

  const handleShowModal = useCallback(() => {
    setShowModal((isShowing) => !isShowing);
  }, []);

  const handleSetEditModalValue = useCallback(
    (value: string) => {
      setEditModalValue(value);
    },
    [selectedItem]
  );

  const handleSaveEditModal = useCallback(async () => {
    if (editModalValue && selectedItem) {
      const updObj: DictionaryType = {
        id: selectedItem.id,
        name: editModalValue,
      };
      console.log(selectedItem);
      handleDictionaryElementUpdate[selectedTable as DictionaryTable](updObj);
    }
  }, []);

  const handleSaveDeleteModal = useCallback(() => {
    if (selectedItem && selectedItem.id) {
      handleDictionaryElementDelete[selectedTable as DictionaryTable](
        selectedItem.id
      );
    }
  }, []);

  const handleEditAction = useCallback(
    ([table, value]: [DictionaryTable, DictionaryType]) => {
      setSelectedItem(value);
      setSelectedTable(table);
      setEditModalValue(value.name);
      setModalContent(editModalContent);
      handleShowModal();
    },
    [selectedItem]
  );

  const handleDeleteAction = useCallback(
    ([table, value]: [DictionaryTable, DictionaryType]) => {
      setSelectedItem(value);
      setSelectedTable(table);
      setModalContent(deleteModalContent);
      handleShowModal();
    },
    [selectedItem]
  );

  const DICTIONARY_ACTIONS: Record<
    DictionaryActions,
    (el: [DictionaryTable, DictionaryType]) => void
  > = useMemo(
    () => ({
      edit: handleEditAction,
      delete: handleDeleteAction,
    }),
    []
  );

  const editModalContent = useMemo(
    () => (
      <>
        <Input
          type="text"
          size="small"
          id="name"
          label={
            <span>
              Name<span className={classes.required}>*</span>
            </span>
          }
          // errorText={usernameError}
          // hasError={!!usernameError}
          onChange={handleSetEditModalValue}
          placeholder="Your new username"
          // isValidated={usernameIsValidated}
          autoComplete="off"
          value={editModalValue}
        />
        <Button variant="secondary" onClick={handleShowModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveEditModal}>
          Save
        </Button>
      </>
    ),
    [selectedItem, editModalValue]
  );

  const deleteModalContent = useMemo(
    () => (
      <>
        <h2>
          Do you really want to delete: <strong>{selectedItem?.name}</strong>
        </h2>
        <Button variant="secondary" onClick={handleShowModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveDeleteModal}>
          Delete
        </Button>
      </>
    ),
    [selectedItem]
  );

  return (
    <div className={classes.dicitonariesContainer}>
      <Tabs>
        <TabList>
          <Tab>Company</Tab>
          <Tab>Contract</Tab>
        </TabList>

        <TabPanel>
          <h2>List of your defined companies</h2>

          <Table
            data={companies}
            fields={[DICTIONARY_FIELDS.NAME]}
            actions={DICTIONARY_ACTIONS}
            id="company"
          />
        </TabPanel>
        <TabPanel>
          <h2>List of your defined contracts</h2>

          <Table
            data={contracts}
            fields={[DICTIONARY_FIELDS.NAME]}
            actions={DICTIONARY_ACTIONS}
            id="contract"
          />
        </TabPanel>
      </Tabs>
      <Modal
        isOpen={showModal}
        onClose={handleShowModal}
        classNames={classes.editModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
};
