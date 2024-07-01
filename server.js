import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'node:fs';
const program = new Command();


const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'please enter course title'
    },
    {
        type: 'number',
        name: 'price',
        message: 'please enter course price'
    },
]

const filePath = './courses.json';

program
    .name('CLI Courses Tools')
    .description('CLI to make courses')
    .version('1.0.0');

program
    .command('add')
    .alias('a')
    .description("add a courses")
    .action(() => {
        inquirer
            .prompt(questions)
            .then((answers) => {
                if (fs.existsSync(filePath)) {
                    fs.readFile(filePath, "utf8", (err, fileContent) => {
                        if (err) {
                            console.log("error :", err)
                            process.exist();
                        }
                        console.log("file content :", fileContent)
                        const fileContentAsJson = JSON.parse(fileContent);
                        fileContentAsJson.push(answers);
                        fs.writeFile(filePath, JSON.stringify(fileContentAsJson), "utf8", () => {
                            console.log("add courses done")
                        })

                    })
                } else {
                    fs.writeFile(filePath, JSON.stringify([answers]), "utf8", () => {
                        console.log("add courses done")
                    })
                }
            })
    })

program
    .command('list')
    .alias('l')
    .description("list all courses")
    .action(() => {
        fs.readFile(filePath, "utf8", (err, Content) => {
            if (err) {
                console.log("error :", err);
                process.exist()
            }
            console.table(JSON.parse(Content))
        })
    })
program.parse(process.argv);