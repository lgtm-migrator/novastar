import Struct from 'typed-struct';

import { DeviceType, Packet } from './Packet';
import Request from './Request';

describe('packs', () => {
  test('RequestPack', () => {
    const req = new Request([0x80]);
    req.serno = 0x15;
    req.destination = 0;
    req.deviceType = DeviceType.ReceivingCard;
    req.address = 0x02000001;
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
    const pack = new Packet(data);
    expect(pack.ack === 0 && pack.serno === 0x15 && pack.address === 0x2000001);
  });
});
