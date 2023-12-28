import { ActionName } from "../../actions/actions";
import { State } from "../state";
import { ActionList, StateName } from "../type/type";

export abstract class TailState extends State<ActionName, StateName> {
  constructor(name: StateName, list?: ActionList) {
    super(name, list);
  }
}
