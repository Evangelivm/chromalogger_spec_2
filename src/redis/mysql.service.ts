import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { codeMap } from '../tcp/code-map';
import { connections } from '../config/connections.config';

@Injectable()
export class MysqlService {
  private tableMap: Map<string, string>;

  constructor(private prisma: PrismaService) {
    // Crear un mapa de projectName -> tableName
    this.tableMap = new Map(
      connections.map((conn) => [conn.projectName, conn.tableName]),
    );
  }

  async insertData(data: string[], projectName: string) {
    if (data.length === 0) return;

    const tableName = this.tableMap.get(projectName);
    if (!tableName) {
      throw new Error(`No table configured for project ${projectName}`);
    }

    const parsedData = data.map((item) => JSON.parse(item));

    const records = parsedData.flatMap((entry) =>
      entry.dataGroup.map((item) => {
        const record = {};
        Object.entries(codeMap).forEach(([_, value]) => {
          record[value.db_name] = item[value.db_name];
        });
        record['time'] = item.time;
        record['data'] = item.data;
        return record;
      }),
    );

    try {
      // Usar la propiedad dinámica del cliente Prisma para acceder a la tabla
      await (this.prisma[tableName] as any).createMany({
        data: records,
        skipDuplicates: true,
      });

      console.log('\x1b[32m%s\x1b[0m', `Data inserted into ${tableName}`);
    } catch (error) {
      console.error(`Error al insertar datos en ${tableName}:`, error);
    }
  }
}
