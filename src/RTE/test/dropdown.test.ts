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

it('should work', () => {
    const dropdown = createDropdown().get();
    console.log('dropdown', JSON.stringify(dropdown, null, 2));
    expect(1).to.equal(1);
})