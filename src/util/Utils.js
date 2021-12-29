const MathUtil = {
    percent: (num, total) => {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
            return 0;
        }
        return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
    }
}

const FileUtil = {
    read: async () => {
        let [fileHandle] = await window.showOpenFilePicker();
        return [fileHandle, await fileHandle.getFile()];
    },
    write: async (fileHandle, contents) => {
        const writable = await fileHandle.createWritable();
        await writable.write(contents);
        await writable.close();
    }
}

export { MathUtil, FileUtil }