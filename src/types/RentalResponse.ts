interface RentalResponse {
    id: number,
    dateInit: Date | string|null,
    dateEnd: Date | string | null,
    state: string,//pend,conf,canc
    total: number,
    username: string,
    tuitionBoat: number
}

export default RentalResponse
