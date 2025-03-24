export interface ConnectionConfig {
  projectName: string;
  port: number;
  description?: string;
  tableName: string; // Nueva propiedad para especificar la tabla
}

export const connections: ConnectionConfig[] = [
  {
    projectName: 'project1',
    port: 1231,
    description: 'Main drilling project',
    tableName: 'test_record_1',
  },
  {
    projectName: 'project2',
    port: 1232,
    description: 'Secondary drilling project',
    tableName: 'test_record_2',
  },
  {
    projectName: 'project3',
    port: 1233,
    description: 'Secondary drilling project',
    tableName: 'test_record_3',
  },
  {
    projectName: 'project4',
    port: 1234,
    description: 'Secondary drilling project',
    tableName: 'test_record_4',
  },
  {
    projectName: 'project5',
    port: 1235,
    description: 'Secondary drilling project',
    tableName: 'test_record_5',
  },
  {
    projectName: 'project6',
    port: 1236,
    description: 'Secondary drilling project',
    tableName: 'test_record_6',
  },
  {
    projectName: 'project7',
    port: 1237,
    description: 'Secondary drilling project',
    tableName: 'test_record_7',
  },
  {
    projectName: 'project8',
    port: 1238,
    description: 'Secondary drilling project',
    tableName: 'test_record_8',
  },
  {
    projectName: 'project9',
    port: 1239,
    description: 'Secondary drilling project',
    tableName: 'test_record_9',
  },
  {
    projectName: 'project10',
    port: 1240,
    description: 'Secondary drilling project',
    tableName: 'test_record_10',
  },
];
