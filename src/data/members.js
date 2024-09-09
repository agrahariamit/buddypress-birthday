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
import { addQueryArgs } from '@wordpress/url';

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
export default function Members({ itemIDs }) {

    // Define state variables for form inputs
    const [members, setMembers] = useState([]);

    useEffect(() => {

        apiFetch({ path: '/buddypress/v1/members' }).then(items => {
            setMembers(items);
        });
    }, [itemIDs]);
        


   

    return(
        <div {...useBlockProps()}>
            
            {members.length > 0 ? (
                members.map((member) => (
                    <div key={member.id}>
                        {/* {console.log(member.latest_update)} */}
                        {/* Replace this with the actual member data rendering */}
                        <div className="item-header-avatar">
                            <a href={member.link} target="_blank">
                                <img
                                    key={'avatar-' + member.id}
                                    className="avatar"
                                    alt={sprintf(__('Profile photo of %s', 'buddypress'), member.name)}
                                    src={member.avatar_urls['thumb']}
                                />
                            </a>
                        </div>
                        <div className="member-description">
                            <blockquote className="wp-block-quote">
                                {/* <div dangerouslySetInnerHTML={{ __html: member.latest_update.rendered }} /> */}
                                <cite>
                                    {(
                                        <span>
                                            {member.name}
                                        </span>
                                    )}
                                    &nbsp;
                                    {(
                                        <a href={member.link} target="_blank">
                                            (@{member.mention_name})
                                        </a>
                                    )}
                                </cite>
                            </blockquote>
                        </div>
                    </div>
                ))
            ) : (
                <p>{__('No members Found', 'buddypress-birthday')}</p>
            )}
        </div>
    );


    
}
