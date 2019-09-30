/**
 * JS转换数据类型
 * @param type  数据英文类型
 * @returns {string}
 */
export function enName2CnName(type) {
    const dataTypeMap = {
        PM25: "PM2.5",
        PM10: "PM10",
        SO2: "SO2",
        NO: "NO",
        O3: "O3",
        CO: "CO",
        TEMP: "温度",
        HUMI: "湿度",
        ILLUM: "照度",
        WS: "风速",
        WD: "风力",
        TSP: "TSP"
    }

    return dataTypeMap[type] || ""
}
