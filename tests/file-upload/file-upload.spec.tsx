import {
    act,
    fireEvent,
    getByTestId,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { FileItemProps, FileUpload } from "../../src/file-upload";

describe("FileUpload", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    describe("Basic render", () => {
        it("should render the title and description if specified", () => {
            render(
                <FileUpload
                    title={DEFAULT_TITLE}
                    description={DEFAULT_DESCRIPTION}
                />
            );

            expect(screen.getByText(DEFAULT_TITLE)).toBeInTheDocument();
            expect(screen.getByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Upload files" })
            ).toBeInTheDocument();
        });

        it("should render the warning banner if specified", () => {
            const warningBannerContent = (
                <div data-testid="custom-warning">
                    This is a warning.
                    <br />
                    This is the file limit.
                </div>
            );

            const rendered = render(
                <FileUpload warning={warningBannerContent} />
            );

            expect(rendered.getByTestId("custom-warning")).toBeInTheDocument();
        });

        it("should render the file items if specified", () => {
            const fileItems: FileItemProps[] = [MOCK_NON_IMAGE_FILE];

            const rendered = render(<FileUpload fileItems={fileItems} />);

            expect(screen.getByText("bugs-bunny.pdf")).toBeInTheDocument();
            expect(screen.getByText("3 KB")).toBeInTheDocument();
            expect(
                rendered.getByTestId("some-delete-button")
            ).toBeInTheDocument();
        });

        it("should render the image files in its edit mode if no description is specified for the image", () => {
            const fileItems: FileItemProps[] = MOCK_FILE_ITEMS;

            const rendered = render(<FileUpload fileItems={fileItems} />);

            expect(screen.getByText("bugs-bunny.png")).toBeInTheDocument();
            expect(screen.getByText("3 KB")).toBeInTheDocument();
            expect(
                rendered.getByTestId("some-edit-display")
            ).toBeInTheDocument();
        });

        it("should render the image files with an edit button if there is a description, or if the user cancelled an edit previously", () => {
            const fileItems: FileItemProps[] = [
                { ...MOCK_IMAGE_ITEM, description: "Lorem ipsum" },
                {
                    id: "another",
                    name: "donald-duck.png",
                    type: "image/png",
                    size: 4000,
                    truncateText: false, // Test purposes
                },
            ];

            const rendered = render(<FileUpload fileItems={fileItems} />);

            // First image to be in list view but with edit button
            expect(screen.getByText("bugs-bunny.png")).toBeInTheDocument();
            expect(screen.getByText("3 KB")).toBeInTheDocument();
            expect(
                rendered.getByTestId("some-edit-button")
            ).toBeInTheDocument();

            // Second image to be in edit view
            expect(screen.getByText("donald-duck.png")).toBeInTheDocument();
            expect(screen.getByText("4 KB")).toBeInTheDocument();
            expect(
                rendered.getByTestId("another-edit-display")
            ).toBeInTheDocument();

            // Cancel editing for second image
            const cancelButton = rendered.getByTestId("another-cancel-button");
            fireEvent.click(cancelButton);

            expect(
                rendered.getByTestId("another-edit-button")
            ).toBeInTheDocument();
        });
    });

    describe("Upload", () => {
        let file: File;

        beforeEach(() => {
            file = new File(["(⌐□_□)"], "bugs-bunny.png", {
                type: "image/png",
            });
        });

        it("should fire the onChange callback when a file is uploaded", async () => {
            const onChangeCallback = jest.fn();

            const rendered = render(<FileUpload onChange={onChangeCallback} />);
            const dropzoneInput = rendered.getByTestId("dropzone-input");

            await waitFor(() =>
                fireEvent.change(dropzoneInput, {
                    target: { files: [file] },
                })
            );

            expect(onChangeCallback).toBeCalledWith([file]);
        });
    });

    describe("Delete", () => {
        it("should fire the onDelete callback when a file item's delete button is clicked", () => {
            const onDeleteCallback = jest.fn();

            const fileItems: FileItemProps[] = [MOCK_NON_IMAGE_FILE];

            const rendered = render(
                <FileUpload fileItems={fileItems} onDelete={onDeleteCallback} />
            );
            const deleteButton = rendered.getByTestId("some-delete-button");

            fireEvent.click(deleteButton);

            expect(onDeleteCallback).toBeCalledWith(MOCK_NON_IMAGE_FILE);
        });
    });

    describe("Edit", () => {
        it("should render the textarea, save and cancel buttons in edit mode", () => {
            const fileItems: FileItemProps[] = MOCK_FILE_ITEMS;

            const rendered = render(<FileUpload fileItems={fileItems} />);

            expect(screen.getByText("Photo description")).toBeInTheDocument();
            expect(rendered.getByTestId("some-textarea")).toBeInTheDocument();
            expect(
                rendered.getByTestId("some-save-button")
            ).toBeInTheDocument();
            expect(
                rendered.getByTestId("some-cancel-button")
            ).toBeInTheDocument();
        });

        it("should return the file item with the description via onEdit upon entering into the textarea", () => {
            const fileItems: FileItemProps[] = [MOCK_IMAGE_ITEM];
            const mockFn = jest.fn();

            const rendered = render(
                <FileUpload fileItems={fileItems} onEdit={mockFn} />
            );

            const textarea = rendered.getByTestId("some-textarea");
            fireEvent.change(textarea, { target: { value: "Hello world" } });
            fireEvent.click(rendered.getByTestId("some-save-button"));

            expect(mockFn).toBeCalledWith({
                ...MOCK_IMAGE_ITEM,
                description: "Hello world",
            });
        });
    });
});

// =============================================================================
// CONSTANTS
// =============================================================================
const DEFAULT_TITLE = "File upload component";
const DEFAULT_DESCRIPTION = "This is a description";
const MOCK_IMAGE_ITEM = {
    id: "some",
    name: "bugs-bunny.png",
    type: "image/png",
    size: 3000,
    truncateText: false, // Test purposes
};

const MOCK_FILE_ITEMS = [MOCK_IMAGE_ITEM];
const MOCK_NON_IMAGE_FILE = {
    id: "some",
    name: "bugs-bunny.pdf",
    type: "application/pdf",
    size: 3000,
    truncateText: false, // Test purposes
};
