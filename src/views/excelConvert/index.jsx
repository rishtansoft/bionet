import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import XLSXStyle from 'xlsx-js-style';

export const ExportToExcelStudent = ({ apiData, fileName, groupData, headers }) => {
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
        header: {
            font: { bold: true, sz: 13 },
            fill: { patternType: 'solid', fgColor: { rgb: 'D8D8D8' } },
            alignment: { horizontal: 'center', vertical: 'center' }
        },
        cell: {
            alignment: { horizontal: 'center' }
        }
    };

    const exportToCSV = (apiData, fileName) => {
        // Extract header names from the headers array
        const headerNames = headers.map(header => header.Header);

        // Map the apiData to include the headers
        const modifiedData = apiData.map(item => {
            let newItem = {};
            headerNames.forEach((header, index) => {
                newItem[header] = item[Object.keys(item)[index]];
            });
            return newItem;
        });

        const ws = XLSX.utils.json_to_sheet(modifiedData, { header: headerNames });
        const range = XLSX.utils.decode_range(ws['!ref']);

        // Apply the header style
        for (let c = range.s.c; c <= range.e.c; c++) {
            const cell = XLSX.utils.encode_cell({ r: range.s.r, c });
            ws[cell].s = styles.header;
        }

        // Apply the body style
        for (let r = range.s.r + 1; r <= range.e.r; r++) {
            for (let c = range.s.c; c <= range.e.c; c++) {
                const cell = XLSX.utils.encode_cell({ r, c });
                ws[cell].s = styles.cell;
            }
        }

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
        XLSXStyle.writeFile(wb, `Hisobotlar.xlsx`);
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
