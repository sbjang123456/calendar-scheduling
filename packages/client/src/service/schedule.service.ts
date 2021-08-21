import axios from 'axios';

export interface scheduleDataInterface {
    title: string;
    startAtDate?: string;
    startAtTime?: string;
    endAtDate?: string;
    endAtTime?: string;
}

export const findScheduleAll = async () => {
    const { data } = await axios.get(`/api/v1/schedule`);
    return data;
};
export const findScheduleById = async (id: number) => {
    const { data } = await axios.get(`/api/v1/schedule/${id}`);
    return data;
};
export const createSchedule = async (params: scheduleDataInterface) => {
    const { data } = await axios.post(`/api/v1/schedule`, params);
    return data;
};
export const updateSchedule = async (id: number, params: scheduleDataInterface) => {
    const { data } = await axios.put(`/api/v1/schedule/${id}`, params);
    return data;
};
export const deleteScheduleById = async (id: number) => {
    const { data } = await axios.delete(`/api/v1/schedule/${id}`);
    return data;
};