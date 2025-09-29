const {program} = require('commander');
const {fs}= require('fs');

program
 .requiredOption('-i, --input <path>', 'Шлях до файлу для читання')
 .option('-o, --output <path>', 'Шлях до файлу для запису результату')
 .option('-d, --display', 'Виведення результату в консоль');

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

 data = JSON.parse(content);
 
 const result = JSON.stringify(data, null, 2);

if(options.output){
   fs.writefilesync(options.output, result, "utf-8");
}
if(options.display){
    console.log(result);
}