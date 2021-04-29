// eslint-disable-next-line import/no-extraneous-dependencies
import Struct from 'typed-struct';

import { DeviceType, Package } from './Package';
import RequestPackage from './RequestPackage';

describe('packs', () => {
  test('RequestPack', () => {
    const req = new RequestPackage([0x80]);
    req.serialNumber = 0x15;
    req.destinationAddress = 0;
    req.deviceType = DeviceType.ReceivingCard;
    req.registerUnitAddress = 0x02000001;
    req.updateCrc();
    const check = [
      0x55,
      0xaa,
      0,
      0x15,
      0xfe,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      2,
      1,
      0,
      0x80,
      0xee,
      0x56,
    ];
    expect(Struct.raw(req)).toEqual(Buffer.from(check));
  });
  test('AcknowledgePack', () => {
    const data = Buffer.from([
      0xaa,
      0x55,
      0,
      0x15,
      0,
      0xfe,
      1,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      2,
      0,
      0,
      0x6d,
      0x56,
    ]);
    const pack = new Package(data);
    expect(pack.ack === 0 && pack.serialNumber === 0x15 && pack.registerUnitAddress === 0x2000001);
  });
});
