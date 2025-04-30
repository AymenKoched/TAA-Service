import { DataSource, DataSourceOptions } from 'typeorm';

import { conf } from './src/configuration';

const source = new DataSource(conf.database as DataSourceOptions);
export default source;
