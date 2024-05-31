import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import XLSXStyle from 'xlsx-js-style';

export const ExportToExcelStudent = ({ apiData, fileName, groupData, headers, titleValue }) => {
    const [data, setData] = useState(true);

    useEffect(() => {
        if (apiData && apiData.length > 0) {
            setData(true);
        } else {
            setData(false);
        }
    }, [apiData]);

    const excelDataFun = () => {
        exportToCSV(apiData, fileName);
    };

    const styles = {
        title: {
            font: { sz: 14, color: '3F3F76', color: { rgb: '3F3F76' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            fill: { patternType: 'solid', fgColor: { rgb: 'FFCC99' }, }
        },
        header: {
            font: { bold: true, sz: 13 },
            fill: { patternType: 'solid', fgColor: { rgb: 'BEE5E9' } },
            alignment: { horizontal: 'center', vertical: 'center' }
        },
        cell: {
            alignment: { horizontal: 'center' }
        }
    };

    const exportToCSV = (apiData, fileName) => {
        const title = titleValue; // Title to be added

        // Extract header names from the headers array
        const headerNames = headers.map(header => header.Header);

        // Map the apiData to include the headers
        const dataFiled = apiData


        if (typeof dataFiled[0] === 'object' && Object.keys(dataFiled[0]).length === 0 &&
            typeof dataFiled[1] === 'object' && Object.keys(dataFiled[1]).length === 0) {
            console.log(48);
        } else {
            console.log(50);
            dataFiled.unshift({}, {});
        }
        const modifiedData = dataFiled.map(item => {
            let newItem = {};
            headerNames.forEach((header, index) => {
                newItem[header] = item[Object.keys(item)[index]];
            });
            return newItem;
        });

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(modifiedData, { header: headerNames, skipHeader: true });

        // Add the title to the first row
        XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: 'A1' });

        // Add the headers starting from the second row
        XLSX.utils.sheet_add_aoa(ws, [headerNames], { origin: 'A2' });

        const range = XLSX.utils.decode_range(ws['!ref']);

        // Apply the title style
        ws['A1'].s = styles.title;
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: range.e.c } }]; // Merge title cells across all columns

        // Apply the header style
        for (let c = 0; c <= range.e.c; c++) {
            const cell = XLSX.utils.encode_cell({ r: 1, c });
            ws[cell].s = styles.header;
        }

        // Apply the body style
        for (let r = 2; r <= range.e.r; r++) {
            for (let c = 0; c <= range.e.c; c++) {
                const cell = XLSX.utils.encode_cell({ r, c });
                ws[cell].s = styles.cell;
            }
        }

        // Define column widths
        let wscols = [
            { wch: 10 },
            { wch: 50 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
        ];
        ws['!cols'] = wscols;

        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSXStyle.writeFile(wb, `${titleValue}.xlsx`);
    };

    return (
        <div>
            {
                data ? (
                    <button
                        style={{
                            border: '1px solid #c2c2c2',
                            padding: '0.65rem 1rem',
                            borderRadius: '8px',
                            marginRight: '1rem'
                        }}
                        onClick={excelDataFun}
                    >
                        Excel
                    </button>
                ) : (
                    <button
                        style={{
                            border: '1px solid #c2c2c2',
                            padding: '0.65rem 1rem',
                            borderRadius: '8px',
                            marginRight: '1rem'
                        }}
                        disabled
                    >
                        Excel
                    </button>
                )
            }
        </div>
    );
};
