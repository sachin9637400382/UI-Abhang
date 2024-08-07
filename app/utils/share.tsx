export interface TextShareProps {
    message: string
    setLoading: (state: boolean) => void
}

export interface ImageShareProps {
    url: string;
    file: File;
    setLoading: (state: boolean) => void;
}

const ImageShare = async (props: ImageShareProps) => {
    props.setLoading(true);
    try {
        if (navigator.share) {
            try {
                await navigator.share({
                    files: [props.file],
                    url: props.url,
                });
                props.setLoading(false);
            } catch (error) {
                props.setLoading(false);
            }
        } else {
            props.setLoading(false);
        }
    } catch (error) {
        props.setLoading(false);
    }
}

const TextShare = async (props: TextShareProps) => {
    if (props.message === "") return;
    props.setLoading(true);
    try {
        if (navigator.share) {
            try {
                await navigator.share({
                    text: props.message,
                });

                props.setLoading(false);
            } catch (error) {

                props.setLoading(false);
            }
        } else {

            props.setLoading(false);
        }
    } catch (error) {
        props.setLoading(false);
    }
}

const UrlShare = async (props: TextShareProps) => {
    props.setLoading(true);
    try {
        if (navigator.share) {
            try {
                await navigator.share({
                    url: props.message,
                });
                props.setLoading(false);
            } catch (error) {
                props.setLoading(false);
            }
        } else {
            props.setLoading(false);
        }
    } catch (error) {
        props.setLoading(false);
    }
}


export {
    ImageShare,
    TextShare,
    UrlShare
}