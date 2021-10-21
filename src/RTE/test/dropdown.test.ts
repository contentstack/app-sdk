import { expect } from "chai";
import { RTEPlugin } from "..";
import React from "react";

const createDropdown = () => {
    const DropDown = new RTEPlugin('Parent', () => {
        return ({
            title: 'Dropdown',
            iconName: React.createElement('p')
        })
    });
    const Child = new RTEPlugin('Child', () => {
        return ({
            title: 'Child',
            iconName: React.createElement('span')
        })
    });
    DropDown.addPlugins(Child);
    return DropDown;
}

const stringify = (j:any):string => JSON.stringify(Object(j));

it('Dropdown get() has icon', () => {
    const dropdown = createDropdown().get();
    expect(dropdown.registry).to.have.property('iconName');
    expect(stringify(dropdown.registry.iconName)).to.equal(stringify(React.createElement('p')));
});

it('Dropdown get() has dependent plugin', () => {
    const dropdown:any = createDropdown().get();
    expect(dropdown.meta.dependentPlugins).to.have.length(1);
})

it('Dropdown icon without get()', () => {
    const dropdown:any = createDropdown();
    expect(stringify(dropdown.pluginMetaData.registry.iconName)).to.equal(stringify(React.createElement('p')));
})