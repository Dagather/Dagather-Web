import { UiPathRobot } from '@uipath/robot';

export default function uipathConfig() {
  const robot = UiPathRobot.init();
  const processes = robot.getProcesses();
  console.log(robot, processes);
}
