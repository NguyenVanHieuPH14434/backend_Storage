import multer from 'multer';
import EXCEL from 'exceljs';
import XLSX from 'xlsx';
import csvtojson from 'csvtojson';

export namespace Common {

    export const readingData = async (fileName:any)=>{
        const workbook = XLSX.readFile('./src/public/'+ fileName);
        const sheet_name_list = workbook.SheetNames;
       return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    }

    export const fileStore = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './src/public')
        }, 
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })
    
    export const upload = multer({storage: fileStore});

    
    
    export const exportData = (data:any, setHeaderColumns:any, res:any, nameExcel:string)=>{
        const wb = new EXCEL.Workbook();
            const ws = wb.addWorksheet(nameExcel)
            ws.columns = setHeaderColumns;
    
            let counter = 1;
    
            data.forEach((item:any)=>{
                ws.addRow(item);
                counter++;
            })
    
            ws.getRow(1).eachCell((cell)=>{
                cell.font = {bold:true}
            })
    
            res.setHeader("Content-Type", "apllication/vnd.openxmlformats-officedocument.spreadsheatml.sheet")
            res.setHeader("Content-Disposition", `attachment;filename=${nameExcel}.xlsx`);
            return wb.xlsx.write(res).then(() => {
                res.status(200);
            })
    
    }

    export const newToDate = (reqToDate:string) =>{
        let day = reqToDate.split('/')[0];
        let month = reqToDate.split('/')[1];
        let year = reqToDate.split('/')[2];
        let newDay = String(Number(day) +1);
        return newDay + '/' + month + '/' + year;
    }
 
}

 