export interface Blog {
    [x: string]: any;
    _id: string;
    title: String;
    body: String;
    authorDetail: String;
    tags: String;
    postedAt: Date;
}
