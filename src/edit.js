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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, Panel, PanelBody, PanelRow, CheckboxControl, SelectControl } from '@wordpress/components';
import Members from './data/members';
import xProfileFileds from './data/xProfileFileds';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const onChangeTitle = (title) => {
        setAttributes({ title: title });
    };

    const onCheckedAge = (memberAge) => {
        setAttributes({ memberAge: memberAge });
    }

    const onCheckedWishes = (wishes) => {
        setAttributes({ wishes: wishes });
    }

    const onChangeSelectField = (field) => {
        setAttributes({ field: field });
    }

    // const [isChecked, setChecked] = useState(attributes.age);

    return (
        <div {...useBlockProps()}>
            <InspectorControls key="setting">
                <Panel>
                    <PanelBody title={__('Member Information', 'block-development-examples')}>
                        <PanelRow>
                            <p>
                                {__('This block displays member information from a BuddyPress API endpoint.', 'block-development-examples')}
                            </p>
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Title', 'block-development-examples')}
                                value={attributes.title}
                                onChange={onChangeTitle}
                            />
                        </PanelRow>
                        <PanelRow>
                            <CheckboxControl
                                label={__(' Show the age of the person', 'block-development-examples')}
                                checked={attributes.memberAge}
                                onChange={onCheckedAge}
                            >
                            </CheckboxControl>
                        </PanelRow>
                        <PanelRow>
                            <CheckboxControl
                                label={__('Enable option to wish them', 'block-development-examples')}
                                checked={attributes.wishes}
                                onChange={onCheckedWishes}
                            >
                            </CheckboxControl>
                        </PanelRow>
                        {/* <SelectControl
                            label={__('Field name', 'block-development-examples')}
                            value={attributes.field}
                            options={[
                                { value: 'a', label: 'Option A' },
                                { value: 'b', label: 'Option B' },
                                { value: 'c', label: 'Option C' },
                            ]}
                            onChange={onChangeSelectField}
                        /> */}
                        <ProfileFields {...attributes}></ProfileFields>
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <Members {...attributes}></Members>
            
        </div>
    );
}
