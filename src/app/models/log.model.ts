export interface Log{
    id: number,
    timeDate: string,
    userEmail: string,
    action: string,
    oldData: LogData,
    newData: LogData
}

export interface LogData {
    name: string,
    age: number,
    email: string,
    address: string,
    others: string,
    interests: string,
    feelings: string,
    values: string,
    isActive: boolean
}