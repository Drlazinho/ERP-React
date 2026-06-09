import styled from "styled-components";

export const Container = styled.section`
    margin-bottom: 1rem;
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #f00;
    width: 100%;
`

export const ContainerGroupColumn = styled.div`
    width: 100%;
    padding: 0 10%;
    height: 30vh;
    min-height: 300px;
    display: flex;
    flex-direction: row;
    gap: 0;
    justify-content: center;
`

export const ColumnData = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    /* Z-INDEX - VARIAVEL */

    .content_data {
        display: flex;
        flex-direction: column;
        gap: 2;
    }

    .nome_user {
        font-size: 1.2rem;
        text-align: center;
    }

    .setor_user {
        font-size: 1rem;
        text-align: center;
    }

    .header_podium {
        width: 100%;
        height: 1.25rem;
        background-color: ${(props) => props.bgColor};
        filter: saturate(80) brightness(70%);
        border-radius: 20px;
    }

    .footer_podium {
        width: 85%;
        height: calc(90% - (2.75rem * (${(props) => props.positionValue})));
        background-color: ${(props) => props.bgColor};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: baseline;
        /* align-items: center; */
        .number_classification {
            color: #fff;
            text-shadow: 0px 1px 3px rgba(0,0,0,0.76);            
            text-align: center;
            font-size: 1.5rem;
        }
    }
`;