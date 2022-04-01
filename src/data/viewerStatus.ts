export interface viewerStatus {
    status: string;
}

const viewer: viewerStatus = {
    status: 'guest',
}

export const setStatusGuest = () => viewer.status = 'guest';

export const setStatusAdmin = () => viewer.status = 'admin';

export const setStatusUser = () => viewer.status = 'user';

export const getViewerStatus = () => viewer.status;