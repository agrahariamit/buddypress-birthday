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
import { SelectControl } from '@wordpress/components';
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
export default function ProfileFields({ field }) {
    // Define state variables for form inputs
    const [fields, setFields] = useState([]);

    useEffect(() => {
        // Fetch data from BuddyPress xProfile API
        apiFetch({ path: 'buddypress/v1/xprofile/fields' })
            .then(items => {
                setFields(items);
            })
            .catch(err => {
                console.error('Error fetching xProfile fields:', err);
            });
    }, []); // Adding an empty dependency array to run effect only on component mount

    // Map the fetched fields to the desired options format
    const selectOptions = fields
        .filter(item => item.type === 'datebox') // Filter to include only 'datebox' types
        .map(item => ({
            value: item.id,  // Assign the field ID as the value
            label: item.name // Assign the field name as the label
        }));

    return (
        <div {...useBlockProps()}>
            {fields.length > 0 ? (
                <SelectControl
                            label={__('Field name', 'block-development-examples')}
                            value={field}
                            options={selectOptions}
                            onChange={onChangeSelectField}
                        />
            ) : (
                <p>{__('Loading fields...', 'text-domain')}</p>
            )}
        </div>
    );


}
