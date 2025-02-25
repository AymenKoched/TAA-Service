import { DataSource, DataSourceOptions } from 'typeorm';

import { database } from './conf/env-dev.json';

const source = new DataSource(database as DataSourceOptions);
export default source;
