import { DaprTaskDefinition } from "../tasks/daprCommandTaskProvider";
import { DaprdDownTaskDefinition } from "../tasks/daprdDownTaskProvider";
import scaffoldTask from "../scaffolding/taskScaffolder";
import { TaskDefinition } from "vscode";
import ext from "../ext";

async function onConflictingTask(task: TaskDefinition): Promise<boolean> {
    return Promise.resolve(true);
}

export default async function scaffoldDaprTasks() {
    // TODO: Infer name from application manifest/project file, or repo folder name.
    const appId = await ext.ui.showInputBox({ prompt: 'Enter a Dapr ID for the application', value: 'app' });
    // TODO: Infer port from application manifest/project file, or application stack.
    const appPortString = await ext.ui.showInputBox({ prompt: 'Enter the port on which the application listens.', value: '5000' });
    const appPort = parseInt(appPortString, 10);

    const daprdUpTask: DaprTaskDefinition = {
        type: 'daprd',
        label: 'daprd-debug',
        appId,
        appPort
    };

    const daprdDownTask: DaprdDownTaskDefinition = {
        type: 'daprd-down',
        label: 'daprd-down',
        appId
    };

    await scaffoldTask(daprdUpTask, onConflictingTask);
    await scaffoldTask(daprdDownTask, onConflictingTask);
}
