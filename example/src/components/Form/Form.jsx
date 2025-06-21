import style from "./Form.component.scss";

function Form() {
	return (
		<form data-style={style}>
			<div>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" name="name" required />
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required />
			</div>
			<div>
				<label htmlFor="color">Favorite color:</label>
				<select name="color" id="color">
					<option value="#f00">Red</option>
					<option value="#0f0">Green</option>
					<option value="#00f">Blue</option>
				</select>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

export default Form;
