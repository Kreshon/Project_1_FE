
export interface Reimbursement{
    amount: number;
    status: string; // "0 status approved", "1 status denied", "2 status pending"
    commentEmployee: string; // allow comments on requests
    commentManager: string; // allow messages on approval or denial of requests
    file?: string; // for the bonus of uploading an image
}