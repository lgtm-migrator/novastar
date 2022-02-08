import { ChipTypeEnum } from '@novastar/native/build/main/generated/ChipType';
import Struct, { ExtractType, typed } from 'typed-struct';

export const RegistorConfig = new Struct('RegistorConfig')
  .UInt8('chipType', typed<ChipTypeEnum>())
  .UInt16LE('mask')
  .UInt16LE('red')
  .UInt16LE('green')
  .UInt16LE('blue')
  .UInt16LE('vred')
  .compile();

export type RegistorConfig = ExtractType<typeof RegistorConfig, false>;
