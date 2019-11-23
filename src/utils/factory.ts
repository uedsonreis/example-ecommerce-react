import { Platform } from "react-native";

export abstract class Factory {

    protected config: any = Platform.select({
        web: { headerMode: 'screen' },
        default: {},
    });

    public abstract createStack(): any;
}