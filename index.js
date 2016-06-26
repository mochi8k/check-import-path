const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, process.argv[2]);
const text = fs.readFileSync(filePath, 'utf8');

// 各クラスのimport文を配列で取得.
const importStrings = text.match(/import\s*\w+\s*from\s'\.[\w\/_]+'/g);

const isSuccess = importStrings.every((importString) => {
    return isValidPath(filePath, importString);
});

if (isSuccess) {
    console.log('allpath is valid. yeah!');
}


function isValidPath(rootPath, importString) {

    // pathをキャプチャリング
    const matches = importString.match(/import\s*\w+\s*from\s'(\.[\w\/_]+)'/);

    if (matches == null) {
        console.log(`Regular expression not appropriate., ${importString}`);
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
