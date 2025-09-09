import {F1Parser} from '../F1Parser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketTimeTrialData} from './types';
import {TimeTrialDataSetParser} from './TimeTrialDataSetParser';

export class PacketTimeTrialDataParser extends F1Parser<PacketTimeTrialData> {
  data: PacketTimeTrialData;

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .nest('m_playerSessionBestDataSet', {
        type: new TimeTrialDataSetParser(),
      })
      .nest('m_personalBestDataSet', {
        type: new TimeTrialDataSetParser(),
      })
      .nest('m_rivalDataSet', {
        type: new TimeTrialDataSetParser(),
      });

    this.data = this.fromBuffer(buffer);
  }
}