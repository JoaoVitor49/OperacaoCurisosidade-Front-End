export interface TableModel {
    key: string;
    label: string;
    sortable?: boolean;
    format?: 'date';
    formatArgs?: any;
}