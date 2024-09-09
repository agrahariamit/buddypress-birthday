/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import '../editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function xProfileFileds() {
    console.log('================================', '================================');
    // Define state variables for form inputs
    const [fields, setFields] = useState([]);

    useEffect(() => {
        apiFetch({ path: '/buddypress/v1/xprofile' }).then(items => {
            console.log(items);

            setFields(items);
        });
    })


    return (
        <div {...useBlockProps()}>
            {fetchFields && (
                <div>
                    <ul>
                        {fetchFields.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
