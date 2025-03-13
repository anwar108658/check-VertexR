import { configureStore } from "@reduxjs/toolkit";
import { comboValue } from "./ComboValue";
import { showmenu } from "./ShowMenu";
import { tabs } from "./Tabs";
import { usefulLinks } from "./UsefuLinks";



export const ReduxStore = configureStore({
    reducer:{
        combovalue:comboValue.reducer,
        showmenu,
        tabs,
        usefulLinks,
    }
})