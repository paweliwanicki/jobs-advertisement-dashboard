type TableProps = {
  data: [];
  fields: string[];
};

const Table = ({ data, fields }: TableProps) => {
  return (
    <table>
      <thead>
        {fields.map((field) => (
          <th>{field}</th>
        ))}
      </thead>
      <tbody>
        {data &&
          data.map((el: unknown) =>
            fields.map((field) => (
              <tr>
                <td>{el[field]}</td>
                <td>{el}</td>
              </tr>
            ))
          )}
      </tbody>
    </table>
  );
};

export default Table;
