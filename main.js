const {program} = require('commander');
const fs= require('fs');

program
 .requiredOption('-i, --input <path>', 'Шлях до файлу для читання')
 .option('-o, --output <path>', 'Шлях до файлу для запису результату')
 .option('-d, --display', 'Виведення результату в консоль')
 .option('-f, --furnished', 'Відображати лише будинки зі статусом "furnished" - з меблями')
 .option('-p, --price <value>', 'Відображати лише будинки з ціною меншою за зазначену', parseFloat);
program.parse();

const options = program.opts();

if(!options.input){
    console.error('Please, specify input file');
    process.exit(1);
}
if(!fs.existsSync(options.input)){
    console.error('Cannot find input file');
    process.exit(1);
}
 
 const content = fs.readFileSync(options.input, 'utf-8');

 const data = JSON.parse(content);
 


let FilteredData=data;

if(options.furnished){
    FilteredData=FilteredData.filter(item=>item.furnishingstatus && item.furnishingstatus === 'furnished');
}
if(options.price !== undefined){
    FilteredData=FilteredData.filter(item=>item.price && item.price < options.price);
}




 const result = FilteredData
 .map(item=>`${item.price} ${item.area}`)
 .join("\n");

if(options.output){
   fs.writeFileSync(options.output, result, "utf-8");
}
if(options.display){
    console.log(result);
}