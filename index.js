const path = require('path');
const fs = require('fs');

const stringsToken = /import\s*\w+\s*from\s'\.[\w\/_]+'/g
const stringToken = /import\s*\w+\s*from\s'(\.[\w\/_]+)'/

const filePath = path.resolve(__dirname, process.argv[2]);
const formString = fs.readFileSync(filePath, 'utf8');

// 各クラスのimport文を配列で取得.
const importStrings = formString.match(stringsToken);

const isSuccess = importStrings.every((importString) => {
    return isValidPath(filePath, importString);
});

if (isSuccess) {
    console.log('allpath is valid. yeah!');
}


function isValidPath(rootPath, importString) {
    // path部分をキャプチャリング.
    const matches = importString.match(stringToken);

    if (matches == null) {
        console.log('Regular expression not appropriate.', importString);
        return false
    }

    // 絶対パスの取得
    const absolutePath = path.resolve(path.dirname(rootPath), matches[1]);

    // ファイルの存在確認
    const isExist = (fs.existsSync(`${absolutePath}.es`)) || (fs.existsSync(`${absolutePath}.jsx`))

    if (!isExist) {
        console.log(`path is invalid: ${absolutePath}`);
    }
    return isExist

}
