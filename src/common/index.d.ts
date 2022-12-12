export interface IncomingWebSocketMessage {
    type: string
    data: IncomingDataType
}

export type IncomingDataType = CrossBuildMsg | PhaseMsg

export interface CrossBuildMsg {
    access: Access | undefined;
    cross: Cross | undefined;
    dk: Dk | undefined;
    edit: boolean;
    eth: boolean;
    modeRdk: string;
    phases: number[];
    scon: boolean;
    sfdk: boolean;
    state: State | undefined;
    techMode: string;
    model: Model | undefined;
    svg: string | undefined;
    cameras: boolean;
    deviceElc: number;
    deviceError: DeviceError | undefined;
}

export interface Access {
    4: boolean;
}

export interface Cross {
    ID: number;
    region: Region;
    area: Area;
    subarea: number;
    idevice: number;
    tlsost: Tlsost;
    description: string;
    phases?: any;
    points: Points;
    inputError: boolean;
}

export interface Dk {
    rdk: number;
    fdk: number;
    ddk: number;
    edk: number;
    pdk: boolean;
    eedk: number;
    odk: boolean;
    ldk: number;
    ftudk: number;
    tdk: number;
    ftsdk: number;
    ttcdk: number;
}

export interface State {
    region: number;
    area: number;
    subarea: number;
    id: number;
    idevice: number;
    dgis: string;
    contype: string;
    numdev: number;
    scale: number;
    name: string;
    phone: string;
    wifi: string;
    status: number;
    Arm: string;
    pk: number;
    ck: number;
    nk: number;
    Model: Model;
    arrays: Arrays;
}

export interface Model {
    vpcpdl: number;
    vpcpdr: number;
    vpbsl: number;
    vpbsr: number;
    C12: boolean;
    STP: boolean;
    DKA: boolean;
    DTA: boolean;
}

export interface DeviceError {
    V220DK1: boolean;
    V220DK2: boolean;
    RTC: boolean;
    TVP1: boolean;
    TVP2: boolean;
    FRAM: boolean;
}

export interface Region {
    num: string;
    nameRegion: string;
}

export interface Area {
    num: string;
    nameArea: string;
}

export interface Tlsost {
    num: number;
    description: string;
    control: boolean;
}

export interface Points {
    Y: number;
    X: number;
}

export interface PhaseMsg {
    dk: Dk
    idevice: number
    modeRdk: string
    techMode: string
    model: Model
}

export interface Position {
    region: string
    area: string
    id: number
}