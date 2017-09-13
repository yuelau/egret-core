class EgretResourceManager implements egret.Command {

    async execute() {

        let res = require('../lib/res/res.js');
        let handleException = res.handleException;
        let ResourceManagerUserConfig = res.ResourceManagerUserConfig;


        function getProjectPath(p: string | null) {
            return p ? p : ".";
        }

        let command = process.argv[3];
        let p = getProjectPath(process.argv[4]);
        console.log(command)
        return 0;

        executeCommand(command).catch(handleException);
        return 0;

        async function executeCommand(command: string) {

            switch (command) {
                case "version":
                    return res.version();
                    break;
                case "upgrade":
                    return res.upgrade(p);
                    break;
                case "build":
                case "publish":
                    return res.build(p);
                    break;
                case "watch":
                    return res.watch(p)
                    break;
                case "config":
                    return res.printConfig(p);
                    break;
                case "env":
                    const key = process.argv[3];
                    const value = process.argv[4];
                    if (key != "texture_merger_path") {
                        handleException(`找不到指定的命令{command}`);
                        return null;
                    }
                    else {
                        return res.setEnv(key, value);
                    }

                    break;
                default:
                    handleException(`找不到指定的命令{command}`);
                    return null;
                    break;
            }
        }
    }

}

export = EgretResourceManager


