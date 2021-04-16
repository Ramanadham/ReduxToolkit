import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// setup file
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("dfsdf", () => {
	test("renders learn react link", () => {
		const wrapper = shallow(<App />);
		console.log(wrapper.debug());
	});
});
