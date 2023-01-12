import { Table } from 'components/elements';
import createTableDummyData from 'features/links/helpers/createTableDummyData';

function LinksTable() {
  const dummyData = createTableDummyData(10);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Th</Table.Th>
          <Table.Th>Th</Table.Th>
          <Table.Th>Th</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
          <Table.Td>Td</Table.Td>
        </Table.Tr>
      </Table.Tbody>

      <Table.Tfoot>
        <Table.Tr>
          <Table.Th>Th</Table.Th>
          <Table.Th>Th</Table.Th>
          <Table.Th>Th</Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}

export default LinksTable;
