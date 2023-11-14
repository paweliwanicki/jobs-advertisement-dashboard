import { useTheme } from '../../../hooks/useTheme';
import SvgIcon from '../SvgIcon/SvgIcon';
import classes from './Table.module.scss';

type TableProps = {
  data: Record<string, any>[];
  fields: string[];
  id?: string;
  classNames?: string;
  actions?: Record<any, ([id, el]: [any, any]) => void>; // @TODO fix any
};

const Table = ({
  data,
  fields,
  actions,
  id = '',
  classNames = '',
}: TableProps) => {
  const { theme } = useTheme();
  return (
    <table id={id} className={`${classes.commonTable} ${classNames}`}>
      <thead>
        <tr>
          <th>No.</th>
          {fields.map((field) => (
            <th key={`th-key-${field}`}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((el: any, index: number) => (
            <tr key={`tr-key-${el.id}`}>
              <td key={`td-key-${index}`}>{index + 1}</td>

              {fields.map((field) => (
                <td key={`td-key-${field}-${el.id}`}>{el[field]}</td>
              ))}

              {actions ? (
                <td className={classes.actionsColumn}>
                  {Object.entries(actions).map((action) => {
                    const [key, callback] = action;
                    return (
                      <SvgIcon
                        key={`icon-${el.id}-action-${key}`}
                        id={`icon-${key}`}
                        onClick={() => callback([id, el])}
                        width={20}
                        height={20}
                        color={theme === 'dark' ? '#fff' : '#19202d'}
                        hoverColor={theme === 'dark' ? '#eee' : '#696e76'}
                      />
                    );
                  })}
                </td>
              ) : (
                ''
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
