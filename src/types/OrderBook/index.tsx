import { DataModel as InstrumentDataModel } from "../Instrument";

export type DataModel = {
    id: number;
    isOpen: boolean;
    instrument: InstrumentDataModel;
}